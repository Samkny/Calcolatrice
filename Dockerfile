FROM gcc:latest
COPY main.c .
RUN gcc -o calcolatrice main.c
CMD ["./calcolatrice"]
