import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByText'
})

/**
 * Pipe to filter searches based on user input
 * @author Alex, Xavier
 */
export class AssociateSearchByTextFilter implements PipeTransform {
    transform(items: any[], searchText: string): any[] {

        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();

        // return results that contain firstname, lastname, status, client, ic
        return items.filter(associate => {
            return (associate.firstName.toLowerCase().includes(searchText)
            || associate.lastName.toLowerCase().includes(searchText)
            || (associate.marketingStatus !== null
                && String(associate.marketingStatus).toLowerCase().includes(searchText))
            || (associate.client !== null
                && associate.client.toLowerCase().includes(searchText))
            || String(associate.userId).toLowerCase().includes(searchText));
        });
    }
}
