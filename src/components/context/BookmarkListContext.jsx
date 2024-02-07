import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  const { data: bookmarks, isLoading } = useFetch(BASE_URL);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error.message;
      setIsLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        isLoadingCurrentBookmark,
        currentBookmark,
        getBookmark,
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
