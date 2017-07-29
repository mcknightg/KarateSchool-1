(function () {
    function Persistence() {
        this.stateUndo = [];
        this.stateRedo = [];
    }
    Persistence.prototype.getUndoStateArray = function(id){
        var stateUndoArray = this.stateUndo[id];
        if(!stateUndoArray){
            stateUndoArray = [];
            this.stateUndo[id] = stateUndoArray;
        }
        return stateUndoArray;
    };
    Persistence.prototype.getRedoStateArray = function(id){
        var stateRedoArray = this.stateRedo[id];
        if(!stateRedoArray){
            stateRedoArray = [];
            this.stateRedo[id] = stateRedoArray;
        }
        return stateRedoArray;
    };

    Persistence.prototype.undo = function(id,currentState){
        var undoStateArray = this.getUndoStateArray(id);
        var oldState = undoStateArray.pop();
        if(oldState){
            var redoStateArray = this.getRedoStateArray(id);
            redoStateArray.push(currentState );
            return oldState;
        }
        return null;
    };
    Persistence.prototype.redo = function(id,currentState){
        var redoStateArray = this.stateRedo[id];
        if(redoStateArray){
            var oldState = redoStateArray.pop();
            if(oldState){
                this.save(id,currentState);
                return oldState;
            }
        }
        return null;
    };
    Persistence.prototype.save = function(id,currentState){
        var undoStateArray = this.getUndoStateArray(id);
        undoStateArray.push(currentState);
    };
    window.persistence = new Persistence();
     
    return( window.persistence );
})(jQuery);