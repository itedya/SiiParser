import SiiUnit from "../decorators/sii-unit";
import SiiAttribute from "../decorators/sii-attribute";
import GameClass from "./game-class";
import Vector2 from "../classes/vector-2";

@SiiUnit("accessory_engine_data")
class AccessoryEngineData extends GameClass {
    namespace: string;

    @SiiAttribute("info[]")
    public info: string[];

    @SiiAttribute("torque")
    public torque: number;

    @SiiAttribute("torque_curve[]")
    public torqueCurve: Vector2[];

    @SiiAttribute("rpm_idle")
    public rpmIdle: number;

    @SiiAttribute("rpm_limit")
    public rpmLimit: number;

    @SiiAttribute("adblue_consumption")
    public adblue_consumption: number;
}

export default AccessoryEngineData;