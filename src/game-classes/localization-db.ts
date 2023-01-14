import SiiUnit from "../decorators/sii-unit";
import SiiAttribute from "../decorators/sii-attribute";
import GameClass from "./game-class";

@SiiUnit("localization_db")
class LocalizationDb extends GameClass {
    namespace: string;

    @SiiAttribute("val[]")
    public values: string[];

    @SiiAttribute("key[]")
    public keys: string[];
}

export default LocalizationDb;