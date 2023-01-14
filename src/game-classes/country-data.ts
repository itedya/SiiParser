import SiiUnit from "../decorators/sii-unit";
import SiiAttribute from "../decorators/sii-attribute";
import GameClass from "./game-class";
import Vector4 from "../classes/vector-4";
import Vector3ValueTokenType from "../token-types/value/vector-3";

@SiiUnit("country_data")
class CountryData extends GameClass {
    public namespace: string;

    @SiiAttribute("country_id")
    countryId: number;

    @SiiAttribute("name")
    name: string;

    @SiiAttribute("name_localized")
    nameLocalized: string;

    @SiiAttribute("country_code")
    countryCode: string;

    @SiiAttribute("iso_country_code")
    isoCountryCode: string;

    @SiiAttribute("pos")
    pos: Vector3ValueTokenType;

    @SiiAttribute("fuel_price")
    fuelPrice: number;

    @SiiAttribute("lights_mandatory")
    lightsMandatory: boolean;

    @SiiAttribute("driving_tired_offence")
    drivingTiredOffence: boolean;

    @SiiAttribute("time_zone")
    timeZone: number;

    @SiiAttribute("time_zone_name")
    timeZoneName: string;

    @SiiAttribute("mass_limit_per_axle_count[]")
    massLimitPerAxleCount: number[];

    @SiiAttribute("secondary_time_zone[]")
    secondaryTimeZone: number;

    @SiiAttribute("secondary_time_zone_area[]")
    secondaryTimeZoneArea: Vector4[];

    @SiiAttribute("secondary_time_zone_name[]")
    secondaryTimeZoneName: string;

    @SiiAttribute("imperial_units")
    imperialUnits: boolean;

    @SiiAttribute("leftside_traffic")
    leftSideTraffic: boolean;

    @SiiAttribute("trailer_standalone")
    trailerStandalone: boolean;

    @SiiAttribute("regions[]")
    regions: string[];

    @SiiAttribute("region_areas[]")
    region_areas: Vector4[];
}

export default CountryData;