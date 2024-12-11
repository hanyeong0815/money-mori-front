export default interface ContextCallbackOption {
    success?: <T>(responseData?: T) => void;
    onCatch?: (err?: Error) => void;
}