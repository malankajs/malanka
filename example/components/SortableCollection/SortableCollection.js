import {CollectionComponent, Defaults} from '../../../es5';

import styles from './SortableCollection.css';

@Defaults({
    events: {
        mousedown: 'onMouseDown'
    }
})
export class SortableCollection extends CollectionComponent {

    onMouseDown(event) {
        let element = event.target;

        while(element.parentNode && element.parentNode !== this.element) {
            element = element.parentNode;
        }

        let component = this.getComponentForElement(element);

        if (component) {
            let box = element.getBoundingClientRect(),
                container = element.parentNode,
                parentBox = container.getBoundingClientRect(),
                isMoved = false,
                after;

            let elements = [].map.call(container.childNodes, (node) => {
                return {
                    node,
                    box: node.getBoundingClientRect()
                };
            });

            let placeholder = element.cloneNode(true);
            placeholder.classList.add(styles.placeholder);

            let target = document.createElement('div');
            target.classList.add(styles.target);

            event.preventDefault();

            let onMouseMove = (moveEvent) => {
                let offset = moveEvent.pageY - event.pageY;
                var top = box.top - parentBox.top + offset;

                if (!isMoved) {
                    if (Math.abs(offset) < 10) {
                        return;
                    }

                    container.insertBefore(placeholder, element);

                    element.style.top = box.top - parentBox.top;
                    element.classList.add(styles.drag);
                }

                after = null;
                isMoved = true;

                for (var index = 0; index < elements.length; index++) {
                    let element = elements[index];

                    if (element.box.top > moveEvent.pageY) {
                        after = element.node;
                        break;
                    }
                }

                if (after) {
                    container.insertBefore(target, after);
                } else {
                    container.appendChild(target);
                }

                element.style.top = top;
            };

            let onMouseUp = () => {
                document.body.removeEventListener('mousemove', onMouseMove);
                document.body.removeEventListener('mouseup', onMouseUp);

                if (isMoved) {
                    container.insertBefore(element, target);

                    container.removeChild(placeholder);
                    container.removeChild(target);

                    element.classList.remove(styles.drag);

                    let currentPosition = this.components.indexOf(component);
                    this.components.splice(currentPosition, 1);

                    let afterComponent = this.getComponentForElement(after),
                        position = this.components.indexOf(afterComponent);

                    if (position > -1) {
                        this.components.splice(position, 0, component);
                    } else {
                        this.components.push(component);
                    }

                    this.onDragComplete();
                }
            };

            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
        }
    }

    onDragComplete() {
        this.components.forEach((component, weight) => {
            component[this.modelName].setWeight(weight);
        });
    }

}