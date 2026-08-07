#include <stdio.h>

int main() {
    char op;
    double a, b;
    printf("Operatore (+, -, *, /): ");
    scanf(" %c", &op);
    printf("Inserisci due numeri: ");
    scanf("%lf %lf", &a, &b);
    
    switch(op) {
        case '+': printf("Risultato: %.2lf\n", a + b); break;
        case '-': printf("Risultato: %.2lf\n", a - b); break;
        case '*': printf("Risultato: %.2lf\n", a * b); break;
        case '/': 
            if(b != 0) printf("Risultato: %.2lf\n", a / b);
            else printf("Errore: divisione per zero.\n");
            break;
        default: printf("Operatore non valido.\n");
    }
    return 0;
}
