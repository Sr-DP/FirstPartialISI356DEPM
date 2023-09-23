/*Aplicación de Administración de Biblioteca

Eres el desarrollador principal de una aplicación de administración de biblioteca. En un intento por hacer que la aplicación sea "fácil de usar",
 se ha agregado una gran cantidad de funcionalidad en una única clase, y se ha utilizado un único método para resolver diferentes tareas.

La clase LibraryManager no sólo se encarga de agregar o eliminar libros, sino que también gestiona los préstamos, las devoluciones y 
hasta la notificación por correo electrónico a los usuarios. Asimismo, se ha optado por usar un único método para realizar búsquedas, 
sin importar si es por título, autor o ISBN, complicando su implementación.

Se ha identificado que la clase es muy difícil de mantener y modificar. Tu tarea es estudiar el código, identificar los problemas y
 considerar cómo podría refactorizarse para mejorar su diseño y estructura.*/
class Book {
    constructor(public title: string, public author: string, public ISBN: string) {}
}

class Loan {
    constructor(public book: Book, public userID: string, public date: Date) {}
}

interface EmailServicioInterfaz{
    sendEmail(userID: string, message: string)
    
}

class EmailServicio implements EmailServicioInterfaz{
    sendEmail(userID: string, message: string){
        //enviar mensaje a usuario segun ID
        console.log(`Enviando email a ${userID}: ${message}`);
    }
    
}

/*interface fechaDevolucion{
    sendAlerta(date: Date)
}*/








class LibraryManagerEX {
    private books: Book[] = [];
    private loans: Loan[] = [];
    public emailServicio: EmailServicio;

     // notificaciones 

    // mensaje email sevice

    private constructor(emailServicio:EmailServicio){
        this.emailServicio=emailServicio;

    }

     //notificacion
     // Implementa la notificación a usuarios cuando se añade un libro
     private notifyUsers(bookTitle: string) {
        // Implementa la notificación a usuarios cuando se añade un libro
    }


    /*calcularMulta(libro: Libro): number {
        if (!libro.fechaPrestamo || !libro.fechaDevolucion) {
            throw new Error('El libro no ha sido prestado o devuelto correctamente.');
        }

        const diasRetraso = this.calcularDiasRetraso(libro.fechaPrestamo, libro.fechaDevolucion);
        const multa = diasRetraso * 1; // $1 por día de retraso
        return multa;
    }

    private calcularDiasRetraso(fechaPrestamo: Date, fechaDevolucion: Date): number {
        const tiempoPrestamoEstandar = 7; // 7 días
        const milisegundosPorDia = 24 * 60 * 60 * 1000; // 1 día en milisegundos

        const diferenciaEnDias =
            (fechaDevolucion.getTime() - fechaPrestamo.getTime()) / milisegundosPorDia;

        return Math.max(0, diferenciaEnDias - tiempoPrestamoEstandar);
    }*/
    addBook(book: Book) {
        this.books.push(book);
        this.notifyUsers(book.title);
    }

    removeBook(ISBN: string) {
        const index = this.books.findIndex(book => book.ISBN === ISBN);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    searchByTitle(title: string) {
        return this.books.filter(book => book.title.includes(title));
    }

    searchByAuthor(author: string) {
        return this.books.filter(book => book.author.includes(author));
    }

    searchByISBN(ISBN: string) {
        return this.books.find(book => book.ISBN === ISBN);
    }

    loanBook(ISBN: string, userID: string) {
        const book = this.searchByISBN(ISBN);
        if (book) {
            this.loans.push(new Loan(book, userID, new Date()));
            this.emailServicio.sendEmail(userID, `Has solicitado el libro ${book.title}`);
        }
    }

    returnBook(ISBN: string, userID: string) {
        const index = this.loans.findIndex(loan => loan.book.ISBN === ISBN && loan.userID === userID);
        if (index !== -1) {
            const returnedBook = this.loans.splice(index, 1)[0];
            this.emailServicio.sendEmail(userID, `Has devuelto el libro con ISBN ${returnedBook.book.ISBN}. ¡Gracias!`);
        }
    }

   
}



const libraryex = new LibraryManagerEX();
libraryex.addBook("El Gran Gatsby", "F. Scott Fitzgerald", "123456789");
libraryex.addBook("1984", "George Orwell", "987654321");
libraryex.loanBook("123456789", "user01");



