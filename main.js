const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this._field = field;
        this._x = 0;
        this._y = 0;
        this._field[this._y][this._x] = pathCharacter; // Mark starting position
    }

    print() {
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(''));
        }
    }

    playGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion(); // Get user input for direction
            
            // Check if the move is valid first
            if (!this.isInBounds()) {
                console.log('Out of bounds! Game over.');
                playing = false;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole! Game over.');
                playing = false;
            } else if (this.isHat()) {
                console.log('Congratulations, you found your hat!');
                playing = false;
            } else {
                // Only mark the path if the move is valid and doesn't end the game
                this._field[this._y][this._x] = pathCharacter; // Mark path
            }
        }
    }

    askQuestion() {
        const direction = prompt('Which way? (U/D/L/R): ').toUpperCase();
        switch (direction) {
            case 'U':
                this._y -= 1;
                break;
            case 'D':
                this._y += 1;
                break;
            case 'L':
                this._x -= 1;
                break;
            case 'R':
                this._x += 1;
                break;
            default:
                console.log('Enter a valid direction: U, D, L, R');
                return; // Don't update position if input is invalid
        }
    }

    isInBounds() {
        return (
            this._y >= 0 &&
            this._x >= 0 &&
            this._y < this._field.length &&
            this._x < this._field[0].length
        );
    }

    isHole() {
        return this._field[this._y][this._x] === hole;
    }

    isHat() {
        return this._field[this._y][this._x] === hat;
    }
}

// Initialize the game field
const myField = new Field([
    [fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter],
]);

myField.playGame(); // Start the game
