

export class ListPerson {
    constructor() {
        this.persons = []
    }
    addPerson(person) {
        this.persons.push(person);
    }
    isIdDuplicate(id) {
        return this.persons.some(person => person.id === id);
    }
    removePerson(id) {
        this.persons = this.persons.filter(person => person.id !== id);
    }
    findIndex(id) {
        return this.persons.findIndex(person => person.id === id);
    }

    updatePerson(id,updatedPerson) {
        const index = this.findIndex(id);
        if (index !== -1) {
            this.persons[index] = updatedPerson;
            return true; 
        }
        return false; 
    }


    filterByType(selectedType) {
        if (selectedType === 'ALL') {
            return this.persons;
        } else {
            return this.persons.filter(person => person.type === selectedType);
        }
    }
    sortPersonsByName(sortOrder) {
        this.persons.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (sortOrder === 'asc') {
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            } else {
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
            }
            return 0;
        });
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




