# O Razjo

##### Razjo, czyli aplikacja dostępna na urządzenia mobilne, oraz - póki co w formie aplikacji webowej - na komputery to usprawnienie pracy psychologa, jak i miejsce, w którym osoba korzystająca z niego pomocy znajdzie kilka przydatnych funkcjonalności dla siebie.

#### Razjo zakłada istnienie dwóch typów użytkowników:
* **Psycholog** - może stworzyć „rodzinę” z pacjentem. Może mieć wiele „rodzin”.
* **Zwykły użytkownik** - może dołączyć do „rodziny” psychologa za pomocą kodu zaproszeniowego. Może być tylko w jednej rodzinie.

### Działanie strony internetowej:
##### Po pomyślnej rejestracji użytkownika zostaje wysłany mail powitalny na jego skrzynkę pocztową. Po  zalogowaniu użytkownik ma wybór kilku opcji:
- Tworzenie notatek - są to notatki należące tylko do użytkownika, który je tworzy, nikt inny nie ma do nich wglądu. Jest to idealne miejsce dla użytkownika na zapisywanie swoich przemyśleń lub dla psychologa na umieszczanie wpisów, które nie powinien widzieć pacjent.
- Przeglądanie notatek – w tym miejscu użytkownik posiada możliwość podglądu i zarówno edycji swoich notatek. 
- Kalendarz - rodzina posiada wspólny kalendarz, wyświetlają się w nim informacje o notatkach psychologa, jak i zwykłego użytkownika ale również informacje o zaplanowanych wizytach przez psychologa dla każdego typu użytkownika. Istnieją w aplikacji dwa typy notatek: te dodawane do kalendarza (wspólne dla psychologa i pacjenta) oraz prywatne (tylko widoczne dla użytkownika tworzącego).
- Moja rodzina - dla zwykłego użytkownika znajduje się tam opcja dołączenia do „rodziny”, a po dołączeniu do niej, jest dostępne tam ID rodziny. Psycholog za to ma dostępnych więcej opcji. Może on utworzyć rodzinę, wysłać kod zaproszeniowy do rodziny przez maila lub usunąć rodzinę.

### Działanie aplikacji mobilnej:
Bardzo zbliżone do strony internetowej. 
Po zalogowaniu zwykły użytkownik ma przed sobą kalendarz i zakładkę z prywatnymi notatkami. Kliknięcie na dany dzień wyświetli informacje o notatkach z możliwością dodania, na obecny dzień, oraz o wizytach.
Po zalogowaniu na konto psychologa wyświetlają się pacjenci, a po kliknięciu na któregoś z nich wyświetla się kalendarz i wszystkie inne informacje.

W przypadku jednej i drugiej aplikacji, użytkownik identyfikowany jest za pomocą tokena przesyłanego w request'cie do API.

------------

### Technikalia:
#### Frontend - Strona internetowa:
Język : `TypeScript` oraz Framework `Angular CLI` w wersji **9.1.7**.
**Wykorzystane moduły:**
- 	@angular-devkit/build-angular
- 	@angular/*
- 	@mattlewis92/dom-autoscroller
- 	@ng-bootstrap/ng-bootstrap
- 	@sweetalert2/ngx-sweetalert2
- 	angular-calendar
- 	angular-draggable-droppable
- 	angular-resizable-element
- 	animate.css
- 	calendar-utils
- 	core-js
- 	css-loader
- 	date-fns

------------

### 📲 Aplikacja mobilna 📲
### **[<< POBIERZ APLIKACJĘ >>](https://www.dropbox.com/s/23rw85sp8ryv8il/Razjo.apk?dl=1 "<< POBIERZ APLIKACJĘ >>")**
