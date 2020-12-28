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
      users: [],
      reads: [],
      readsBookData: [],
      userReview: [],
      reviewRead: [],
      book: null,
      genre: null
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
      },
      SETBOOKBYISBN (state, book) {
        state.book = book
      },
      SETGENREBYID (state, genre) {
        state.genre = genre
      },
      SETREADS (state, reads) {
        state.reads = reads
      },
      SETREADSBOOKDATA (state, data) {
        state.readsBookData.push(data)
      },
      RESETREADSBOOKDATA (state) {
        state.readsBookData = []
      },
      SETUSERREVIEW (state, reviews) {
        state.userReview = reviews
      },
      REVIEWADDED (state, id) {
        state.reviewRead.push(id)
      },
      SETREVIEWREAD (state, reviewRead) {
        state.reviewRead = reviewRead
      },
      CLEARREVIEWREAD (state, reviewRead) {
        state.reviewRead = []
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
      },
      getBook: state => () => {
        return state.book
      },
      getGenre: state => () => {
        return state.genre
      },
      getReads: state => () => {
        return state.reads
      },
      getReadsBookData: state => () => {
        return state.readsBookData
      },
      getUserReview: state => () => {
        return state.userReview
      },
      getReviewRead: state => () => {
        return state.reviewRead
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
      fetchGenreById ({ commit }, id) {
        return this.$axios.$get(`/genre/${id}`).then(
          (res) => {
            commit('SETGENREBYID', res.genre[0])
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
          return this.$axios.$get(`/book?search=${args.search}`).then((res) => {
            commit('SETBOOKS', res.result)
          })
        } else {
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
        return this.$axios.$delete(`/book/delete/isbn/${isbn}`).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      },
      fetchBookByGenre ({ commit }, args) {
        return this.$axios.$get(`/book/genre?genre=${args.genre}&page=${args.page}&limit=${args.limit}`).then(
          (res) => {
            commit('SETBOOKS', res.book)
          }, (err) => {
            console.log(err)
          }
        )
      },
      fetchBookByIsbn ({ commit, dispatch }, ISBN) {
        console.log(ISBN)
        return this.$axios.$get(`/book/isbn/${ISBN}`).then(
          async (res) => {
            commit('SETBOOKBYISBN', res.book[0])
            await dispatch('fetchGenreById', res.book[0].Gener_id)
          },
          (err) => {
            console.log(err)
          }
        )
      },

      //! Reads Apis
      fetchReads ({ commit }) {
        return this.$axios.$get('/read/').then(
          (res) => {
            commit('SETREADS', res.reads)
          }, (err) => {
            console.log(err)
          }
        )
      },
      fetchReadsBookData ({ commit }, args) {
        let bookDataObj
        const read = args.read
        if (args.reLoad) {
          commit('RESETREADSBOOKDATA')
        }
        return this.$axios.$get(`/book/id/${read.book_id}`)
          .then((res) => {
            bookDataObj = {
              id: read.id,
              status: read.status,
              Title: res.book[0].Title,
              Author: res.book[0].Author,
              image: res.book[0].Image_url
            }
            commit('SETREADSBOOKDATA', bookDataObj)
          }, (err) => {
            console.log(err)
          })
      },
      completeRead ({ dispatch }, readId) {
        this.$axios.$patch('/read/read-complete', {
          id: readId
        }).then((res) => {
          console.log(res)
          dispatch('fetchReads')
        }, (err) => {
          console.log(err)
        })
      },
      addRead ({ dispatch }, bookId) {
        this.$axios.$post('/read/add-read', {
          book_id: bookId
        }).then(res => console.log(res), err => console.log(err))
      },
      deleteRead ({ dispatch }, readId) {
        return this.$axios.$delete(`/read/delete/${readId}`).then(async (res) => {
          console.log(res)
          await dispatch('fetchReads')
        }, (err) => {
          console.log(err)
        })
      },

      //! Review Apis

      fetchUserReview ({ commit }) {
        const reviewReadId = []
        return this.$axios.$get('/review/user-book').then((res) => {
          commit('SETUSERREVIEW', res.reviews)
          res.reviews.forEach((review) => {
            reviewReadId.push(review.read_id)
          })
          commit('SETREVIEWREAD', reviewReadId)
        }, (err) => {
          console.log(err)
        })
      },
      addReview ({ commit }, review) {
        this.$axios.$post('/review/add-review',
          {
            read_id: review.id,
            rating: review.rating,
            comment: review.comment
          }
        ).then((res) => {
          commit('REVIEWADDED', review.id)
        }, (err) => {
          console.log(err)
        })
      },
      editReview ({ dispatch }, review) {
        this.$axios.$patch(`/review/edit-review/${review.id}`,
          {
            rating: review.rating,
            comment: review.comment
          }
        ).then((res) => {
          console.log(res)
          dispatch('fetchUserReview')
        }, (err) => {
          console.log(err)
        })
      },
      deleteReview ({ dispatch }, id) {
        this.$axios.$delete(`/review/delete/${id}`).then((res) => {
          this.dispatch('fetchUserReview')
        }, (err) => {
          console.log(err)
        })
      }
    }
  })
}

export default createStore
