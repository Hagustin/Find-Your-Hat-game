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
// The field is a 2D array of characters
function getField(difficulty) {
    if (difficulty === 'easy') {
        return [
            [fieldCharacter, fieldCharacter, hole],
            [fieldCharacter, hole, fieldCharacter],
            [fieldCharacter, hat, fieldCharacter],
        ];
    } else if (difficulty === 'medium') {
        return [
            [fieldCharacter, hole, hole],
            [fieldCharacter, fieldCharacter, hole],
            [fieldCharacter, hat, fieldCharacter],
        ];
    } else if (difficulty === 'hard') {
        return [
            [hole, fieldCharacter, hole, fieldCharacter],
            [fieldCharacter, fieldCharacter, hole, fieldCharacter],
            [fieldCharacter, hole, fieldCharacter, fieldCharacter],
            [fieldCharacter, hat, hole, fieldCharacter],
        ];
    } else if (difficulty === 'extra hard') {
        return [
            [hole, fieldCharacter, hole, fieldCharacter, hole],
            [fieldCharacter, hole, fieldCharacter, hole, fieldCharacter],
            [hole, fieldCharacter, fieldCharacter, fieldCharacter, hole],
            [fieldCharacter, hole, fieldCharacter, hole, fieldCharacter],
            [fieldCharacter, hat, fieldCharacter, fieldCharacter, hole],
        ];
    } else {
        console.log('Invalid difficulty level! Defaulting to easy.');
        return getField('easy'); // Default to easy if invalid
    }
}

// Get user input for difficulty level
const difficulty = prompt('Choose difficulty level (easy/medium/hard/extra hard): ').toLowerCase();
const myField = new Field(getField(difficulty));
myField.playGame(); // Start the game
