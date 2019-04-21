const lifeworld = {
    init(numCols,numRows){
        this.numCols = numCols;
        this.numRows = numRows;
        this.world = this.buildArray();
        this.randomSetup();
    },

    buildArray(){
        let outerArray = [];
        for(let row = 0; row <this.numRows; row++){
            let innerArray = [];
            for (let col=0; col<this.numCols; col ++){
                innerArray.push(0);
            }
            outerArray.push(innerArray);
        }
        return outerArray;
    },

    randomSetup(){
        for(let row = 0; row < this.numRows; row++){
            for(let col = 0; col < this.numCols; col++){
                this.world[row][col] = 0;
                if(Math.random() < .1){
                    this.world[row][col] = 1;
                }
            }
        }
    },

    getLivingNeighbors(row,col){
        // row and col should > than 0, if not return 0
        if(row <= 0 || col <= 0){
            return 0;
        }
		
        // row and col should be < the length of the applicable array, minus 1. If not return 0
        if(row > this.world[0].length - 1 || col > this.world[0][0].length - 1){
            return 0;
        }
		
        // count up how many neighbors are alive at N,NE,E,SE,S,SW,W,SE - use this.world[row][col-1] etc
        let sum = 0;

        if(this.world[row -1][col] == 1){
            sum += 1;
        }
        if(this.world[row +1][col] == 1){
            sum += 1;
        }
        if(this.world[row -1][col + 1] == 1){
            sum += 1;
        }
        if(this.world[row +1][col + 1] == 1){
            sum += 1;
        }
        if(this.world[row -1][col - 1] == 1){
            sum += 1;
        }
        if(this.world[row +1][col - 1] == 1){
            sum += 1;
        }
        if(this.world[row][col - 1] == 1){
            sum += 1;
        }
        if(this.world[row][col + 1] == 1){
            sum += 1;
        }
		
        // return that sum
        return sum;
	},

    step(){
        // TODO:
        for(let row = 0; row < this.numRows; row++){
            for(let col = 0; col < this.numCols; col++){
                let livingNeighbors = this.getLivingNeighbors(row,col);

                //Cell is alive- does it die?
                if(this.world[row][col] == 1){
                    if(livingNeighbors < 2 || livingNeighbors > 3){
                        this.world[row][col] = 0;
                    }
                }
                //Cell is dead- does it become alive?
                else if(livingNeighbors == 3){
                    this.world[row][col];
                }
            }
        }
        // nested for loop will call getLivingNeighbors() on each cell in this.world
        // Determine if that cell in the next generation should be alive (see wikipedia life page linked at top)
        // Put a 1 or zero into the right location in this.worldBuffer
        // when the looping is done, swap .world and .worldBuffer (use a temp variable to do so)
    }
}