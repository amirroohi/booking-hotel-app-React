import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(BASE_URL);
        setBookmarks(data);
      } catch (error) {
        toast.error.message;
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    setIsLoading(true);
    setCurrentBookmark(null);

    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error.message;
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
      console.log(data);
    } catch (error) {
      toast.error.message;
    } finally {
      setIsLoading(false);
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
