# Desafio Ignição Digital

## Requisitos

* [Docker](https://www.docker.com)
* [Docker Compose](https://docs.docker.com/compose/)
* [Composer](https://getcomposer.org)
* [Vue CLI](https://cli.vuejs.org)

## Tecnologias
* [Lumen](https://lumen.laravel.com)
* [Vuejs](https://vuejs.org)
  * [Vuex](https://vuex.vuejs.org)
  * [Vue Router](https://router.vuejs.org)

## Configuração do Projeto

Alterar os arquivos **.env.example** do projeto para **.env**

Os arquivos estão localizados na:
* Raiz do projeto
* Pasta Client
* Pasta Api

### Docker Env

```
API_PORT=8080
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
DB_ROOT_PASSWORD=
```

### Api Env

O APP_KEY deve ser uma string de 32 caractéres.
* [Generate String](http://www.unit-conversion.info/texttools/random-string-generator/)
 
```
APP_NAME='Gerenciamento de Clientes'
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=
APP_TIMEZONE=America/Sao_Paulo
APP_LOCALE='pt_BR'

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

### Client Env

```
VUE_APP_API_URL=
```

## Executando o Projeto

### 1º Passo

Instalar todas as dependências do projeto

#### Api

```
composer install
```
#### Client

```
// Yarn
yarn install

// Npm
npm install
```

### 2º Passo - Os comandos devem ser executados na pasta da API e as variáveis de ambiente devem estar configuradas

#### Migrations
É uma forma de versionar o schema da aplicação.
```php
php artisan migrate
```

#### Seeders(Opcional)
É uma forma de popular o banco com dados fictícios.
```php
php artisan migrate --seed
```

### 3º Passo

Na raiz do projeto
```
// Comando para subir os containers (api, db e webserver)
docker-compose up -d
```

Na pasta Client
```
// Yarn - Vue CLI
yarn serve

// Npm - Vue CLI
npm serve
```




