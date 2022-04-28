const parseWishList = async () => {
    let wishlist = await localStorage.getItem("wishlist");
    if(!wishlist) {
        wishlist = {list:[]}
    } else {
        wishlist = JSON.parse(wishlist)
    }
    return wishlist
}

const checkIfExistOnWishList = (wishlist, item) => {
    for(const x of wishlist?.list){
        if(x.imdbID === item.imdbID){
            return true
        }
    }
    return false
}

const checkIfExist = async (item) => {
    const wishlist = await parseWishList()
    return checkIfExistOnWishList(wishlist, item)
}

const removeFromWishList = async (item) => {
    const wishlist = await parseWishList()
    const list = wishlist?.list.filter(e => e.imdbID !== item.imdbID)
    await localStorage.setItem("wishlist", JSON.stringify({list}));
}

const saveToWishList = async (item) => {
    const wishlist = await parseWishList()
    const exist = checkIfExistOnWishList(wishlist, item)
    if(!exist){
        wishlist.list.push(item)
        await localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
} 

const getFromWishList = async () => {
    const { list } = await parseWishList()
    return list
}

export default {
    saveToWishList,
    getFromWishList,
    checkIfExist,
    removeFromWishList
};

