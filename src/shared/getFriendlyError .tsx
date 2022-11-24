/**为什么 */
const map : Record<string,string> = {
    'isvalid' :'格式不正确'
}

export const getFriendlyError = (error : string) => {
    
    return map[error] || error
};
