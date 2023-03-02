import React from 'react';
import Select from "./Select";
import iOption from "../../Interfaces/iSelect";

const countries: iOption[] = [
    {value: "Belgien", name: "Belgien"},
    {value: "Albanien", name: "Albanien"},
    {value: "Andorra", name: "Andorra"},
    {value: "Belarus", name: "Belarus"},
    {value: "Bosnien und Herzegowina", name: "Bosnien und Herzegowina"},
    {value: "Bulgarien", name: "Bulgarien"},
    {value: "Dänemark", name: "Dänemark"},
    {value: "Deutschland", name: "Deutschland"},
    {value: "Estland", name: "Estland"},
    {value: "Finnland", name: "Finnland"},
    {value: "Frankreich", name: "Frankreich"},
    {value: "Griechenland", name: "Griechenland"},
    {value: "Irland", name: "Irland"},
    {value: "Island", name: "Island"},
    {value: "Italien", name: "Italien"},
    {value: "Kroatien", name: "Kroatien"},
    {value: "Lettland", name: "Lettland"},
    {value: "Liechtenstein", name: "Liechtenstein"},
    {value: "Litauen", name: "Litauen"},
    {value: "Luxemburg", name: "Luxemburg"},
    {value: "Malta", name: "Malta"},
    {value: "Moldau", name: "Moldau"},
    {value: "Monaco", name: "Monaco"},
    {value: "Montenegro", name: "Montenegro"},
    {value: "Niederlande", name: "Niederlande"},
    {value: "Nordmazedonien", name: "Nordmazedonien"},
    {value: "Norwegen", name: "Norwegen"},
    {value: "Österreich", name: "Österreich"},
    {value: "Polen", name: "Polen"},
    {value: "Portugal", name: "Portugal"},
    {value: "Rumänien", name: "Rumänien"},
    {value: "Russische Föderation", name: "Russische Föderation"},
    {value: "San Marino", name: "San Marino"},
    {value: "Schweden", name: "Schweden"},
    {value: "Schweiz", name: "Schweiz"},
    {value: "Serbien", name: "Serbien"},
    {value: "Slowakei", name: "Slowakei"},
    {value: "Slowenien", name: "Slowenien"},
    {value: "Spanien", name: "Spanien"},
    {value: "Tschechien", name: "Tschechien"},
    {value: "Türkei", name: "Türkei"},
    {value: "Ukraine", name: "Ukraine"},
    {value: "Ungarn", name: "Ungarn"},
    {value: "Vatikanstadt", name: "Vatikanstadt"},
    {value: "Vereinigtes Königreich", name: "Vereinigtes Königreich"},
    {value: "Zypern", name: "Zypern"},
]

interface iCountrySelect {
    control: any;
    name: string;
    placeholder: string;
    rules: any;
    fullWidth?: boolean;

}

const CountrySelect = ({name, placeholder, ...props}: iCountrySelect) => {
    return (
        <Select
            name={name}
            placeholder={placeholder}
            options={countries}
            {...props}
        />
    )
};

export default CountrySelect;
