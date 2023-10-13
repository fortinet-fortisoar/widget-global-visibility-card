| [Home](../README.md) |
|----------------------|

# Installation
1. To install a widget, click **Content Hub** > **Discover**.
2. Search for the **Record Summary Card** widget.
3. Click the **Record Summary Card** widget card.
4. Click **Install** on the lower part of the screen to begin installation.

# Configuration

The following sections lay out information necessary to customize this widget.

| Fields               | Description                                                                                                                                                        |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Title                | Specify a title for the record summary card.                                                                                                                       |
| Data Source          | Select the module containing JSON data.                                                                                                                            |
| Select Field         | Select a field from the module that contains the data in JSON format.                                                                                              |
| Filter  Condition    | Filter records containing the JSON data. Filter records containing the JSON data. If multiple records meet the filter criteria, the widget creates multiple cards. |
| Object Key to Render | Leave blank if the JSON field's record has data in the required format, else specify the key containing the relevant data.                                         |

| Advanced Settings |
|:------------------|

| Broadcast Event       | Enable to broadcast an event. Once enabled, specify a name of the event for the widget to broadcast.                                                       |
| Event Name            | Enter a name of the event to broadcast. The listener widgets like *Funnel Chart* should be listening to exactly this event name. |

| [Usage](./usage.md) |
|---------------------|