import {Component} from '../../es5';

export class DiComponent extends Component {
    
    updateDependencies(deps) {
        if (!this.isRendered()) {
            return;
        }
        
        let keys = Object.keys(deps);

        for (var index = 0; index < keys.length; index++) {
            var key = keys[index];

            if (key !== 'event' && this[key] !== deps[key]) {
                Object.assign(this, deps);
                this.render();
                return;
            }
        }
    }
    
}