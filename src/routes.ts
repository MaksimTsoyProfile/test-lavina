const host = 'https://no23.lavina.tech'

export const routes = {
  signUp: () => [host, 'signup'].join('/'),
  getBooks: () => [host, 'books'].join('/'),
  booksById: (id:number) => [host, 'books', id].join('/'),
  searchBook: (title:string) => [host, 'books', title].join('/'),
  getMe: () => [host, 'myself'].join('/'),
};