import {CollectionComponent} from '../../../lib/CollectionComponent';
import {Defaults} from '../../../lib/Defaults';

import {RepositoryTableRow} from '../RepositoryTableRow/RepositoryTableRow';

@Defaults({
    tagName: 'table',
    childComponent: RepositoryTableRow
})
export class RepositoriesTable extends CollectionComponent  {
    
}