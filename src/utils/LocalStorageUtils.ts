
export const loadState = (stateKey: string) =>{
    try {
        const serializedState = localStorage.getItem(stateKey)
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}


export const saveState = (stateKey: string, state: object | string) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(stateKey, serializedState)
    } catch (error) {
        console.error(error)
    }
}

export const updateState = (stateKey: string, state: object | string) => {
    try {
        
        if(stateExists(stateKey)){
            // const currState = localStorage.getItem(stateKey)
            // const parsedState = JSON.parse(currState)
            // parsedState.push(state)
            // const serializedState = JSON.stringify(parsedState)
            // localStorage.setItem(stateKey, serializedState)
        }else{
            const serializedState = JSON.stringify(state)
            localStorage.setItem(stateKey, serializedState)
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteState = (stateKey: string) => {
    try {
        localStorage.removeItem(stateKey)
    } catch (error) {
        console.error(error)
    }
}

export const deleteAllState = () => {
    try {
        localStorage.remove()
    } catch (error) {
        console.error(error)
    }
}

export const apiToken = () => {
    try {
        const serializedState = localStorage.getItem("authState")
      
        if(serializedState === null){
            return undefined
        }
        const parsedJson =  JSON.parse(serializedState)
       
        const token = parsedJson.token
        return token;
    } catch (error) {
        console.error(error)
    }
    
}

export const stateExists = (stateKey: string) =>{
    const currState = localStorage.getItem(stateKey)
        if(currState !== null){
            return true;
        }
        return false;
}