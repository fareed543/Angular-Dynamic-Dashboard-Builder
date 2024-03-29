import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonService } from '../json.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit, AfterViewInit {
  nodes: any; // = ['Node 1', 'Node 2', 'Node 3'];
  selectedNode: any;

  dashboards = ['Widget 1', 'Widget 2', 'Widget 3', 'Widget 4'];

  JsonSchema = {
    type: 'object',
    properties: {
      first_name: {
        type: 'string'
      },
      address: {
        type: 'object',
        properties: {
          street_1: {
            type: 'string'
          },
          city: {
            type: 'string'
          }
        }
      }
    }
  };

  jsonFormOptions = {
    addSubmit: false, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defaultWidgetOptions: { feedback: true } // Show inline feedback icons
  };

  yourAngularSchemaFormLayout: any = [];
  yourData: any[] = [];
  responseData: any;

  constructor(private jsonService: JsonService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.showJsonForm();
    }, 0);
  }

  showJsonForm() {
    this.jsonService.getBoards().subscribe(response => {
      console.log(response.boards);
      this.nodes = response.boards;
      // this.responseData = response;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  showNode(item: any) {
    this.selectedNode = item;
    console.log(item);
  }
}
