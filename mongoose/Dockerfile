FROM gcc:4.9

RUN mkdir -p /omp/mongoose

WORKDIR /omp

COPY ./mongoose.h mongoose/mongoose.h
COPY ./mongoose.c mongoose/mongoose.c
COPY ./LICENSE mongoose/LICENSE
COPY ./server.c mongoose/server.c

RUN gcc mongoose/server.c mongoose/mongoose.c -o mongoose/server

CMD ["/bin/false"]
