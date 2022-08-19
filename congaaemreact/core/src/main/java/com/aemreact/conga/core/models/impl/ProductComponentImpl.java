package com.aemreact.conga.core.models.impl;

import com.aemreact.conga.core.models.ProductComponent;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { ProductComponent.class,
    ComponentExporter.class }, resourceType = ProductComponentImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductComponentImpl implements ProductComponent {

    @ValueMapValue
    private String message;

    static final String RESOURCE_TYPE = "congaaemreact/components/product";

    @Override
    public String getMessage() {
        return StringUtils.isNotBlank(message) ? message.toUpperCase() : null;
    }

    @Override
    public String getExportedType() {
        return ProductComponentImpl.RESOURCE_TYPE;
    }


} 