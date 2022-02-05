import { Component } from "./component.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "./project.js";
import autobind from "../decorators/autobind.js"

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  // getter
  get persons() {
    return `${this.project.people} ${
      this.project.people > 1 ? " persons" : " person"
    }`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id); // get the id of the project that is dragging
    event.dataTransfer!.effectAllowed = "move"; // tell browser what cursor looks like and more
  }

  @autobind
  dragEndHandler(_event: DragEvent): void {
    console.log("drag ended");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`; // use the getter
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}