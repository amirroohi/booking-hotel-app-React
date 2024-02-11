import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

const initialState = {
  currentBookmark: null,
  isLoading: false,
  bookmarks: [],
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };

    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("unknown action");
  }
}

function BookmarkListProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  const [{ currentBookmark, isLoading, bookmarks }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });

      try {
        const { data } = await axios.get(BASE_URL);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error.message;
        dispatch({ type: "rejected", payload: "bookmarks not found" });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });

    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error.message;
      dispatch({
        type: "rejected",
        payload: "selecting bookmark not occurred",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });

    try {
      const { data } = await axios.post(`${BASE_URL}/`, newBookmark);

      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error.message;
      dispatch({ type: "rejected", payload: "adding bookmark not occurred" });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      dispatch({
        type: "bookmark/deleted",
        payload: id,
      });

      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error.message;
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
export default BookmarkListProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useBookmark() {
  return useContext(BookmarkContext);
}
