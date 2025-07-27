export const parseParams = (data)=>{
    let results = ''
    for (let index in data){
        results+=index+'='+data[index]+'&'
    }
    return results.substring(0,results.length-1)
}
