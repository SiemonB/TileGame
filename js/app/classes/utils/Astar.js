define(['Class', 'Tile', 'Rectangle'], function (Class, Tile, Rectangle) {
    //Private Vars
    var handler;
    var gatheringpath = 0;
    var global_grid = [];

    var Astar = Class.extend({
        init: function (_checkTime, _handler, _size, _start, _goal, _maxPath) {
            handler = _handler;
            this.size = _size; //Size of the nodes
            this.entity = _start //Reference to The parent entity
            this.checkTime = _checkTime; //The Time In Milliseconds between node checks
            this.width = this.toNodes(handler.getWorld().getWidth() * Tile.DEFAULT_TILE_WIDTH); //Numer of nodes wide the world is
            this.height = this.toNodes(handler.getWorld().getWidth() * Tile.DEFAULT_TILE_HEIGHT);
            this.closedList = new Array(); //Array of nodes that have been checked
            this.openedList = new Array(); // Array of nodes to check
            this.path = new Array(); //Array of waypoints (node positions in piels) to get from the goal to the start node
            if (!global_grid) buildGrid();
            this.grid = global_grid.slice;
            this.maxPath = _maxPath; //The estimated longets path in nodes
            this.start = this.goal = {}; //Starting an goal node object
            this.pathFound = false;
            this.findingPath = false;
        },
        findPath: function () {
            if (!this.findingPath) {
                this.findingPath = true;
                gatheringpath++;
            }
            this.pathFound = false;
            if (this.openedList.length > 0) { //Make sure there are nodes in the opened list
                //Order the opened list so nodes with the lowest fcost are first
                this.openedList = this.openedList.sort(function (a, b) {
                    if (a.cost < b.fcost) return -1;
                    else return 1;
                });
                //Keep only nodes that have the same fcost as the lowest fcost
                var opened = this.openedList;
                var lowests = this.openedList.filter(function (obj) {
                    return obj.fcost == opened[0].fcost;
                });

                //Order all the nodes remaining from lowest heuristic
                lowests = lowests.sort(function (a, b) {
                    if (a.heur < b.heur) return -1;
                    else return 1;
                });

                //Set the current node to the node with the lowest fcost and heuristic
                var current = lowests[0];

                //Remove the current node from the opened list and put it into the closed list
                this.openedList.splice(this.openedList.indexOf(current), 1);
                this.closedList.push(current);

                //If the current node is not the goal node calculate the gcost and fcost for all the neighbor nodes
                if (current.x != this.goal.x || current.y != this.goal.y) {

                    //Loop through all of the neighbor nodes around the current nod
                    for (var i = current.x - 1; i <= current.x + 1; i++) {
                        for (var j = current.y - 1; j <= current.y + 1; j++) {
                            if (i >= 0 && i <= this.width && j >= 0 && j <= this.height) {
                                if (this.grid[i]) this.grid[i] = [];
                                if (!this.grid[i][j]) {

                                    //Set the local neighbor to the current neighbor we are checking
                                    var neighbor = {
                                        x: i, //Position on x in nodes
                                        y: j, //Position on y in nodes
                                        obs: this.isObs(i, j), //Boolean whether node is an obstacle or not
                                        parent: null, //Reference to the node which the character should come from to this node
                                        gcost: 0, //Distance traveled to get to this node from the start node
                                        fcost: 0, // gcost + heuristic
                                    };
                                    this.grid[i][j] = neighbor;
                                } else {
                                    neighbor = this.grid[i][j];
                                }

                                //getHeuristic requires a node object, this is why it cannot be within the object declaration
                                neighbor.heur = getHeuristic(neighbor, this.goal, this.maxPath); //Distance to goal node

                                if (neighbor != current && !neighbor.obs && this.closedList.indexOf(neighbor) == -1) {

                                    //Calculate the gcost of the current neighbor
                                    var gcost = getGCost(current, neighbor);

                                    //Check if neighbor is already in the openlist
                                    if (this.openedList.indexOf(neighbor) != -1) {

                                        if (neighbor.fcost > gcost + neighbor.heur) {
                                            //Since the fcost is less
                                            neighbor.parent = current; //Reset the parent to the current node
                                            neighbor.gcost = gcost; //Reset gcost
                                            neighbor.fcost = getFCost(neighbor); //Reset fcost
                                        }
                                    } else { //Since the neighbor is not in the opened list
                                        this.openedList.push(neighbor); //Add the neighbor to the opened list
                                        neighbor.parent = current; //Set the parent of the neighbor node to the current node
                                        neighbor.gcost = gcost; //Set gcost
                                        neighbor.fcost = getFCost(neighbor); //Set the fcost
                                    } //END "if in opened list "
                                } // END "if not current obstacle closed list"
                            }
                        } // END "for j"
                    } // END "for i"

                    if (this.checkTime > 0) {
                        var t = this; //Set a temp reference to this for use in the anonymouse function

                        //Create a timeout for the amount of time passed in the constructor
                        setTimeout(function () {
                            t.findPath(); //Re-run the findpath function at the set timing
                        }, this.checkTime);
                    } else {
                        this.findPath();
                    }
                } else { //else this node is the goal node
                    this.tracePath(current);
                }
            } else {
                //no path found to goal node, find closest node
                this.closedList.sort(function (a, b) { //order the closed list ascending by heuristic
                    if (a.heur < b.heur) return -1;
                    else return 1;
                });
                this.tracePath(this.closedList[0]); // Pass the closest node to the goal node in as the node to trace from
            }
        },
        tracePath: function (_node) {

            //Reset all variables related to finding the pathfound
            this.path = new Array();
            this.grid = new Array();
            this.pathfound = true; //Set pathFound to true(for render function)
            var current = _node; // Set the local current node passed into the function

            while (current.x != this.start.x || current.y != this.start.y) { //While the current node is not the start node
                current.isPath = true; //set isPath to true letting the render know this node is part of the path
                this.path.push({
                    x: this.toPixels(current.x),
                    y: this.toPixels(current.y)
                });
                current = current.parent; //Reset the current node to the parent of the current node
                this.findingPath = false;
            }
            gatheringpath--;
            this.entity.setPath(this.path.reverse()); //Reverse of path array
            this.openedList = new Array(); //Array to check
            this.closedList = new Array(); //Array that has been checked
        }, //END tracePath function
        isObs: function () {
            //Create range of tiles that the node is overlapping
            var startX = Math.max(0, parseInt((this.toPixels(x)) / Tile.DEFAULT_TILE_WIDTH));
            var startY = Math.max(0, parseInt((this.toPixels(y)) / Tile.DEFAULT_TILE_HEIGHT));
            var endX = Math.min(parseInt(handler.getWorld().getWidth()), parseInt((this.toPixels(x) + this.size) / Tile.DEFAULT_TILE_WIDTH));
            var endY = Math.min(parseInt(handler.getWorld().getHeight()),
                parseInt((this.toPixels(y) + this.size) / Tile.DEFAULT_TILE_HEIGHT));

            // Loop trough tiles and check if they`re solid
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    if (handler.getWorld().getTile(i, j).isSolid()) {
                        return true;
                    }
                }
            };

            //Check if node overlaps a static entity

            //Get a list of only static entity
            var entities = handler.getWorld().getEntityManager().getEntities();

            //Check if any of the static entities are intersecting the node
            for (var e = 0; e < entities.length; e++) {
                var ent = entities[e];
                if (ent != this.entity) {
                    if (ent.isStatic()) {
                        var entBox = new Rectangle(ent.x + ent.bounds.x, ent.y + ent.bounds.y, ent.bounds.width, ent.bounds.height);
                        var checkBox = new Rectangle(this.toPixels(x), this.toPixels(y), this.size, this.size);

                        //If the two rectangles are intersecting return true
                        if (entBox.intersects(checkBox)) return true;
                    }
                }
            }
            return false; //If node doesnt overlap solid tile or static entity return false
        }, //END Obs function
        render: function (_g) {
            if (!this.pathFound) { //If the path isnt isnt found, render the opened & closed list
                for (var i = 0; i < this.closedList.length; i++) { //Loop trough the closedlist and render the nodes as red
                    var node = this.closedList[i];
                    _g.fillStyle = "red";
                    _g.fillRect(node.x * this.size - handler.getGameCamera().getxOffset(), node.y * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                }

                for (var i = 0; i < this.openedList.length; i++) { //Loop through the opened list and render the nodes as grey
                    var node = this.openedList[i];
                    _g.fillStyle = "grey";
                    _g.fillRect(node.x * this.size - handler.getGameCamera().getxOffset(), node.y * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                }
            } //END if paths found

            for (var i = 0; i < this.entity.path.lenght; i++) {
                var node = this.entity.path[i];
                _g.fillStyle = "white";
                _g.fillRect(node.x * this.size - handler.getGameCamera().getxOffset(), node.y * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
            }

            /*
            //Shows A* working
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {

                    _g.strokeStyle = (this.grid[i][j].obs) ? "white" : "black";

                    if (this.grid[i][j].start) {
                        _g.fillStyle = "blue";
                        _g.fillRect(
                            i * this.size - handler.getGameCamera().getxOffset(),
                            j * this.size - handler.getGameCamera().getyOffset(),
                            this.size,
                            this.size
                        );

                    }

                    if (this.grid[i][j].goal) {
                        _g.fillStyle = "yellow";
                        _g.fillRect(
                            i * this.size - handler.getGameCamera().getxOffset(),
                            j * this.size - handler.getGameCamera().getyOffset(),
                            this.size,
                            this.size
                        );
                    }
                    _g.strokeRect(
                        i * this.size - handler.getGameCamera().getxOffset(),
                        j * this.size - handler.getGameCamera().getyOffset(),
                        this.size,
                        this.size
                    );

                    _g.fillStyle = "pink";
                    _g.font = 'italic 7pt Calibri';
                    _g.fillText(this.grid[i][j].heur, i * this.size - handler.getGameCamera().getxOffset(), (this.size / 2) + j * this.size - handler.getGameCamera().getyOffset());
                    _g.font = 'italic 7pt Calibri';
                    _g.fillText(this.grid[i][j].gcost, i * this.size + (this.size / 2) - handler.getGameCamera().getxOffset(), (this.size / 2) + j * this.size - handler.getGameCamera().getyOffset());
                    _g.font = 'italic 7pt Calibri';
                    _g.fillText(this.grid[i][j].fcost, i * this.size + (this.size / 3) - handler.getGameCamera().getxOffset(), (this.size / 1.2) + j * this.size - handler.getGameCamera().getyOffset());

                    if (this.grid[i][j].ispath) {
                        _g.fillStyle = "orange";
                        _g.fillRect(i * this.size - handler.getGameCamera().getxOffset(), j * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                    }

                }
            }

            */

            //Render display box with how many nodes were checked to find the path

            _g.font = "italic 20px Calibri";
            _g.fillStyle = "black";
            _g.fillRect(20 - handler.getGameCamera().getxOffset(), 20 - handler.getGameCamera().getyOffset(), 120, 30);
            _g.fillStyle = "white";
            _g.fillText("checks:" + this.closedList.length, 25 - handler.getGameCamera().getxOffset(), 40 - handler.getGameCamera().getyOffset())
        },
        toPixels: function (_v) {
            return _v * this.size;
        },
        toNodes: function (_v) {
            return parseInt(_v / this.size);
        },
        getSize: function () {
            return this.size;
        },
        updateStart: function (_x, _y) {
            var x = this.toNodes(_x);
            var y = this.toNodes(_y);
            this.start = {
                x: x,
                y: y,
                obs: this.isObs(x, y), //Boolean whether node is an obstacle or not
                parent: null, //Reference to the node which the character should come from to this node
                gcost: 0, //Distance traveled to get to this node from the start node
                fcost: 0, // gcost + heuristic
            }
            this.openedList = new Array(this.start);
        },
        updateGoal: function (_x, _y) {
            var x = this.toNodes(_x);
            var y = this.toNodes(_y);
            var obs = this.isObs(x, y);
            if (!obs) {
                this.end = {
                    x: x,
                    y: y,
                    obs: this.isObs(x, y), //Boolean whether node is an obstacle or not
                    parent: null, //Reference to the node which the character should come from to this node
                    gcost: 0, //Distance traveled to get to this node from the start node
                    fcost: 0, // gcost + heuristic
                }
            }
        }
    });

    Astar.getCurrentlyFinding = function () {
        return gatheringpath;
    }

    //Returns the distance(nodes) from the node to the goal node
    function getHeuristic(_node, _goal, _maxPath) {
        if (_maxPath == 0) {
            return getDistance(_node, _goal);
        } else {
            return getDistance(_node, _goal) * (1 + (10 / _maxPath)); // Optimized goal node retrieving
        }
    }

    //Returns the total distance traveled from start node to node2
    function getGCost(_node1, _node2) {
        return _node1.gcost + getDistance(_node1, _node2);
    }

    //Return the fcost(gcost + heuristic)
    function getFCost() {
        return node.gcost + node.heur;
    }

    function getDistance(_a, _b) {
        var distX = _a.x - _b.x;
        var distY = _a.y - _b.y;

        return Math.round(Math.sqrt(distX * distX + distY + distY) * 10);
    }

    return Astar;
});
