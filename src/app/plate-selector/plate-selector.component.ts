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
        //this.map[start] = {isRange: true, endNum: end}
        numbers.map(n => {this.map[n] = {isRange: true, endNum: end};});
        continue;
      }
      this.map[column[i]] = {isRange: false};
      selectedColumns.push(Number(column[i]));
    }
    if(this.hasDuplicates(selectedColumns)){
      this.inputError = true;
      this.errorMessage = "Duplicate inputs";
      this.columnsInput.control.setErrors({"erro":true});
    }else if(this.hasVaildInputs(selectedColumns)){
      this.inputError = true;
      this.errorMessage = "Input values must be between 0 and number of columns";
    }else{
      this.selectedColumns = selectedColumns;
    }
    console.log(this.map)
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
  

  constructor() { }

  ngOnInit(): void {
    this.wellColumns= this.range(1, this.wellsArrangement[this.wells].column);
    this.wellRows = this.alphabets.slice(0,this.wellsArrangement[this.wells].row);
  }


}
