import React, { useEffect, useState } from "react"

const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState()
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebounceValue(value)
      }, ms)
    
      return () => {
        clearTimeout(timeout)
      }
    }, [ms, value])
    return debounceValue
}

export default useDebounce