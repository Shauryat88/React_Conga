package com.aemreact.conga.core.models;

import com.adobe.cq.export.json.ComponentExporter;
public interface OpenWeatherModel extends ComponentExporter {

    public String getLabel();

    public double getLat();

    public double getLon();
}
