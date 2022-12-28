import CmdArgs from "./cmd-args";
import HandableException from "./exceptions/handable-exception";

try {
    const args = CmdArgs.parse();
} catch (e) {
    if (e instanceof HandableException) {
        e.handle();
    } else {
        throw e;
    }
}
