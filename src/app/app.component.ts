import {Component, OnInit} from '@angular/core';

export interface Box {
  id: number,
  color: string,
  player: number,
  clicked: boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  boxes: Box[][] = [];
  players = [{id: 0, name: 'player1', currentTurn: true, color: 'red'}, {id: 1, name: 'player2', currentTurn: false, color: 'yellow'}]
  currentPlayer = this.players[0];
  isWin = false;

  ngOnInit(): void {
    var count = 0;
    while(count <= 41){
      for (let i = 0; i < 6; i++) {
        this.boxes[i] = [];
        for (let j = 0; j < 7; j++) {
          const box: Box = {id: count, color: 'grey', player: 3, clicked: false}
          this.boxes[i][j] = box;
          count++;
        }
      }
    }
  }

  onBox(box: Box, rowIndex: number, boxIndex: number){

      const curentBox =  this.boxes[rowIndex][boxIndex];

      if(curentBox.clicked){
        return;
      }
      if(rowIndex === 5){
        curentBox.clicked = true;
        curentBox.color = this.currentPlayer.color;
        curentBox.player = this.currentPlayer.id;
      }else {
        if(this.boxes[rowIndex + 1][boxIndex].clicked){
          curentBox.clicked = true;
          curentBox.color = this.currentPlayer.color;
          curentBox.player = this.currentPlayer.id;
        }
      }

    if(this.checkForWin(rowIndex, boxIndex)){
      this.showWinner();
    };
    this.switchPlayer();

  }

  switchPlayer(){
    if(this.currentPlayer.id === 0){
      this.currentPlayer = this.players[1];
    }else {
      this.currentPlayer = this.players[0];
    }
  }

  checkForWin(rowIndex: number, boxIndex: number){
    this.checkForWaagrechtWin(rowIndex, boxIndex);
    this.checkForSenkrechtWin(rowIndex, boxIndex);
    this.checkForDiagonaleWin(rowIndex, boxIndex);

    return this.isWin;
  }

  checkForWaagrechtWin(rowIndex: number, boxIndex: number){
    var filterdBoxes: Box[] = [];
    filterdBoxes =  this.boxes[rowIndex].filter(box => box.color === this.currentPlayer.color);
    var counter = 1;
    if(filterdBoxes.length >= 4){
      filterdBoxes.forEach((box, index) => {
        if(index+1 === filterdBoxes.length){
          if(counter === 4){
            this.isWin = true;
          }
          return;
        }
        if(filterdBoxes[index+1].id - box.id === 1){
          counter++;
          if(counter === 4){
            this.isWin = true;
          }
        }else {
          counter = 1;
        }
      })
    }
  }

  checkForSenkrechtWin(rowIndex: number, boxIndex: number) {
    var filterdBoxes: Box[] = [];
    var counter = 1;

    for (let i = 0; i < 6; i++) {
      if (this.boxes[i][boxIndex].clicked && this.boxes[i][boxIndex].color === this.currentPlayer.color) {
        filterdBoxes.push(this.boxes[i][boxIndex])
      }
    }


    if (filterdBoxes.length >= 4) {
      console.log(filterdBoxes)

      filterdBoxes.forEach((box, index) => {
        if (index + 1 === filterdBoxes.length) {
          if (counter === 4) {
            this.isWin = true;
          }
          return;
        }
        if (filterdBoxes[index + 1].id - box.id === 7) {
          counter++;
          if (counter === 4) {
            this.isWin = true;
          }
        } else {
          counter = 1;
        }
      })
    }
  }

  checkForDiagonaleWin(rowIndex: number, boxIndex: number){
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = rowIndex + i;
        const c = boxIndex + i;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && this.boxes[r][c].color === this.currentPlayer.color) {
            count++;
            if (count === 4) {
                this.isWin=true;
            }
        } else {
            count = 0;
        }
    }

    count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = rowIndex + i;
        const c = boxIndex - i;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && this.boxes[r][c].color === this.currentPlayer.color) {
            count++;
            if (count === 4) {
                this.isWin = true;
            }
        } else {
            count = 0;
        }
    }
  }

  showWinner(){
    alert('Winner' + this.currentPlayer.name)
  }
}

