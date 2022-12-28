abstract class HandableException extends Error {
    public abstract handle(): void;
}

export default HandableException;