/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

const cookieparser = process.server ? require('cookieparser') : undefined

const compareObjects = (object1, object2, key) => {
  const obj1 = object1[key].toUpperCase()
  const obj2 = object2[key].toUpperCase()

  if (obj1 < obj2) {
    return -1
  }
  if (obj1 > obj2) {
    return 1
  }
  return 0
}

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      Auth: {
        token: null,
        id: null,
        email: '',
        role: ''
      },
      books: [],
      genres: [],
      users: []
    }),
    mutations: {
      setAuth (state, token) {
        const decoded = jwt.verify(token, '123')
        state.Auth.token = token
        state.Auth.id = decoded.id
        state.Auth.email = decoded.email
        state.Auth.role = decoded.role
      },
      LOGOUT (state) {
        state.Auth.token = null
        state.Auth.id = null
        state.Auth.email = ''
        state.Auth.role = ''
      },
      SETUSERS (state, users) {
        state.users = users
      },
      SETGENRES (state, genres) {
        state.genres = genres
      },
      SETBOOKS (state, books) {
        state.books = books
      },
      SETPAGELIMIT (state, pageLimit) {
        state.page = pageLimit.page || 1
        state.limit = pageLimit.limit || 10
      }
    },
    getters: {
      getUsers: state => () => {
        return state.users
      },
      getGenres: state => () => {
        return state.genres
      },
      getBooks: state => () => {
        return state.books
      },
      getBookByIsbn: state => (isbn) => {
        return state.books.find(b => b.ISBN === isbn)
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let token = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            token = parsed.token
            if (token && token.length > 0) {
              commit('setAuth', token)
            }
          } catch (err) {
            // No valid cookie found
            console.log(err)
          }
        }
      },

      //! admin user Apis

      fetchUsers ({ commit }) {
        return this.$axios.$get('/user/users').then(
          (res) => {
            commit('SETUSERS', res.Users)
          },
          (err) => {
            console.log(err)
          }
        )
      },
      addAdmin ({ dispatch }, email) {
        return this.$axios.$patch(`/user/admin-user/${email}`).then(
          (res) => {
            dispatch('fetchUsers')
          },
          (err) => {
            console.log(err)
          }
        )
      },
      deleteUser ({ dispatch }, email) {
        return this.$axios.$delete(`/user/${email}`).then(
          (res) => {
            dispatch('fetchUsers')
          },
          (err) => {
            console.log(err)
          }
        )
      },

      //! admin Genres Apis

      fetchGenres ({ commit }) {
        let genre
        return this.$axios.$get('/genre').then(
          (res) => {
            genre = res.genres
            genre.sort((book1, book2) => {
              return compareObjects(book1, book2, 'name')
            })
            commit('SETGENRES', genre)
          },
          (err) => {
            console.log(err)
          }
        )
      },
      addGenres ({ dispatch }, name) {
        return this.$axios
          .$post('/genre/add-genre', {
            name: name
          })
          .then(
            () => {
              dispatch('fetchGenres')
            },
            (err) => {
              console.log(err)
            }
          )
      },
      editGenre ({ dispatch }, genre) {
        return this.$axios
          .$patch(`/genre/edit-genre/${genre.editId}`, {
            name: genre.name
          })
          .then(
            () => {
              dispatch('fetchGenres')
            },
            (err) => {
              console.log(err)
            }
          )
      },
      deleteGenre ({ dispatch }, id) {
        return this.$axios.$delete(`/genre/delete/${id}`).then(
          () => {
            dispatch('fetchGenres')
          },
          (err) => {
            console.log(err)
          }
        )
      },

      //! admin Books Apis

      fetchBooks ({ commit }, args) {
        if (args.search) {
          console.log(args.search)
          return this.$axios.$get(`/book?search=${args.search}`).then((res) => {
            commit('SETBOOKS', res.result)
          })
        } else {
          console.log(args.pageLimitArg.page)
          return this.$axios
            .$get(`/book?page=${args.pageLimitArg.page}&limit=${args.pageLimitArg.limit}`)
            .then(
              (res) => {
                commit('SETBOOKS', res.book)
              },
              (err) => {
                console.log(err)
              }
            )
        }
      },
      addBook (context, bookObj) {
        return this.$axios.$post('book/add-book', bookObj).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      },
      editBook (context, bookObj) {
        return this.$axios.$patch('/book/edit-book', bookObj).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      },
      deleteBook (context, isbn) {
        console.log(isbn)
        return this.$axios.$delete(`/book/delete/isbn/${isbn}`).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      }
    }
  })
}

export default createStore
