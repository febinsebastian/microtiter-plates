import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'plate-selector',
  templateUrl: './plate-selector.component.html',
  styleUrls: ['./plate-selector.component.css']
})
export class PlateSelectorComponent implements OnInit {
  
  wellsArrangement: {[key: number]: {[key:string]: number}} = {
    6: {row: 2, column: 3},
    12: {row: 3, column: 4},
    24: {row: 4, column: 6},
    48: {row: 6, column: 8},
    96: {row: 8, column: 12},
    384: {row: 16, column: 24},
  }

  @Input() wells:number = 96;
  @ViewChild('columns') columnsInput!: NgModel;

  selectedColumns:number[] = [];
  inputError:boolean = false; 
  errorMessage:string = '';  
  alphabets = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  wellColumns:number[] = [];
  wellRows:string[] = [];
  map: { [key: number]: {[key:string]: boolean|number} } = {};
  openWindow = false;

  validateInput(){
    let column = this.columnsInput.value.split(",");
    let selectedColumns = [];
    this.map = {};
    this.inputError = false;
    this.errorMessage = '';
    for(let i=0; i<column.length; i++){
      if ( column[i].indexOf('-') > -1 ) {
        let start = Number(column[i].split("-")[0]);
        let end = Number(column[i].split("-")[1]);
        let numbers = this.range(start,end);
        selectedColumns.push(...numbers);
        //this.map[start] = {isRange: true, endColumn: end}
        numbers.map(n => {this.map[n] = {isRange: true, endColumn: end};});
        continue;
      }
      this.map[column[i]] = {isRange: false};
      selectedColumns.push(Number(column[i]));
    }
    if(this.hasDuplicates(selectedColumns)){
      this.inputError = true;
      this.errorMessage = "Duplicate inputs";
    }else if(this.hasVaildInputs(selectedColumns)){
      this.inputError = true;
      this.errorMessage = "Input values must be between 0 and number of columns";
    }else{
      this.selectedColumns = selectedColumns;
      this.columnsInput.control.setValue(this.sortInput(this.selectedColumns.slice()));
    }
    console.log(this.map)
  }

  sortInput(arr: number[]) {
    let sortArray = arr.sort(function(a, b) {return a - b;});
    let result = []
    for (let i = 0; i<sortArray.length; i++ ){
      let element = sortArray[i]
      if(this.map[element] && this.map[element].isRange){
        let start = element;
        let end:any = this.map[element].endColumn;
        sortArray.splice(i,(end-start))
        if(start == end){
          result.push(String(start));
          this.map[start] = {isRange:false};
          continue;
        }
        result.push(String(start)+'-'+end);
        continue;
      }
      result.push(String(element));
    }
    return result.join(',');
  }

  hasVaildInputs(arr: number[]){
    return arr.some((element, index) => {
      return element < 1 || element > this.wellColumns.length;
    });
  }

  hasDuplicates(arr:number[]) {
    return arr.some((element, index) => {
      return arr.indexOf(element) !== index
    });
  }

  range(start: number, end: number) {
    return [...Array(1+end-start).keys()].map(v => start+v)
  }

    selectWell(selectedColumn:number){
    let index = this.selectedColumns.indexOf(selectedColumn);
    let updateEndColumn = false;
    let selectedColumnEnd;
    if(this.map[selectedColumn] && this.map[selectedColumn].isRange){
      let endColumn = this.map[selectedColumn].endColumn;
      let nextColumn = this.selectedColumns[index+1];
      selectedColumnEnd = this.map[selectedColumn].endColumn;
      for (let key in this.map) {
        if(selectedColumn == Number(key)){
          this.map[nextColumn] = {isRange:true, endColumn: endColumn}
          break;
        }else if(selectedColumn >= Number(key)){
          updateEndColumn = true;
          if(endColumn == nextColumn && selectedColumn != endColumn) {
            this.map[nextColumn] = {isRange:false};
            break;
          }else if(selectedColumn == endColumn){break;}
          else if(selectedColumn < endColumn){
            this.map[nextColumn] = {isRange:true, endColumn: selectedColumnEnd};
          }else{
            updateEndColumn = false;
            this.map[nextColumn] = {isRange:true, endColumn: endColumn};
          }
          break
        }
      }
    }
    console.log(this.map)
    if(index == -1){
      this.selectedColumns.push(selectedColumn);
    }else{
      this.selectedColumns.splice(index,1);
      delete this.map[selectedColumn];
    }
    if(updateEndColumn){
      for (let i=index-1; i>=0; i--) {
        if(this.map[this.selectedColumns[i]].isRange && this.map[this.selectedColumns[i]].endColumn == selectedColumnEnd){
          this.map[this.selectedColumns[i]] = {isRange:true, endColumn: this.selectedColumns[index-1]}
          continue;
        }
        break;
      }
    }
    this.columnsInput.control.setValue(this.sortInput(this.selectedColumns.slice()))
  }
  

  constructor() { }

  ngOnInit(): void {

    if(!this.wellsArrangement[this.wells]){this.wells = 96;}

    this.wellColumns= this.range(1, this.wellsArrangement[this.wells].column);
    this.wellRows = this.alphabets.slice(0,this.wellsArrangement[this.wells].row);
  }


}
