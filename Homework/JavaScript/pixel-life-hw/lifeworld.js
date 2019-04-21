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
		// TODO:
		// row and col should > than 0, if not return 0
		
		// row and col should be < the length of the applicable array, minus 1. If not return 0
		
		// count up how many neighbors are alive at N,NE,E,SE,S,SW,W,SE - use this.world[row][col-1] etc
		
		// return that sum
	},

    step(){
        // TODO:
        
        // nested for loop will call getLivingNeighbors() on each cell in this.world
        // Determine if that cell in the next generation should be alive (see wikipedia life page linked at top)
        // Put a 1 or zero into the right location in this.worldBuffer
        // when the looping is done, swap .world and .worldBuffer (use a temp variable to do so)
    }
}