export function intersection(left: any[], right: any[]): any[] {
    return left.filter(function(element){
        return right.indexOf(element) > -1;
    });
}