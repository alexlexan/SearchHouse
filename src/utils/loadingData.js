
const getData = async () => {
    const key = '-M5nKpHmlxdjPIfwYVs8'
    const responce = await fetch(`https://react-booking-51ffe.firebaseio.com/data/${key}.json`)
                            .then(response => response.json())
    const data = Object.values(responce.properties)

    return data
  }

export default getData