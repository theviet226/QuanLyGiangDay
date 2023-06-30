

export class ListPerson {
    constructor() {
        this.persons = []
    }
    addPerson(person) {
        this.persons.push(person);
    }
    removePerson(id) {
        this.persons = this.persons.filter(person => person.id !== id);
    }
    findIndex(id) {
        let indexND = -1;
        this.persons.map((nd, index) => {
            if (nd.id === id) {
                indexND = index;
            }
        });
        return indexND;
    }
    saveToLocalStorage() {
        localStorage.setItem('persons', JSON.stringify(this.persons));
    }
    loadFromLocalStorage() {
        const storedPersons = localStorage.getItem('persons');
        if (storedPersons) {
          this.persons = JSON.parse(storedPersons);
        }
      }
    

}