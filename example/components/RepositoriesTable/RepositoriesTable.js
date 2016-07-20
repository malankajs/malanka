import {CollectionComponent, Defaults} from '../../../es5';

import {RepositoryTableRow} from '../RepositoryTableRow/RepositoryTableRow';

@Defaults({
    tagName: 'table',
    ChildComponent: RepositoryTableRow
})
export class RepositoriesTable extends CollectionComponent  {
    
}