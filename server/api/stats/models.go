package stats

type TotalUsers struct {
	Users         int `json:"users"`
	Admins        int `json:"admins"`
	Groups        int `json:"groups"`
	DisabledUsers int `json:"disabledUsers"`
	// TotalUserdevices represents all of user devices present in organization.
	Idps []idpUsers `json:"totalIdps"`
}

type idpUsers struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type AllUserDevices struct {
	TotalUserdeivce   int            `json:"totalUserdevices"`
	TotalBrowsers     int            `json:"totalBrowsers"`
	TotalMobiles      int            `json:"totalMobiles"`
	TotalWorkstations int            `json:"totalWorkstations"`
	BrowserByType     []deviceByType `json:"browserByType"`
	MobileByType      []deviceByType `json:"mobileByType"`
	WorkstationByType []deviceByType `json:"workstationsByType"`
}

type deviceByType struct {
	Name    string `json:"name"`
	Version string `json:"version"`
	// Value is count. naming ambiguaous value because echart expects value field.
	Value int `json:"value"`
}

type AllServices struct {
	TotalServices  int         `json:"totalServices"`
	ServicesByType []nameValue `json:"servicesByType"`
	TotalGroups    int         `json:"totalGroups"`
	//TODO
	DynamicService                bool `json:"dynamicService"`
	SessionRecordingDisabledCount int  `json:"sessionRecordingDisabledCount"`
}

type nameValue struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type FailedReasonsByType struct {
	// using Name and Value instead of Type and Count because echart expects such.
	Name  string `json:"name"`
	Label string `json:"label"`
	Value int    `json:"value"`
}

type LoginsByHour struct {
	Hour  string `json:"name"`
	Count string `json:"value"`
}

type geoDataType struct {
	Name        string    `json:"name"`
	City        string    `json:"city"`
	Value       int64     `json:"value"`
	Coordinates []float64 `json:"coordinates"`
}

type todayHexa struct {
	OrgID     string `json:"orgID"` //needed for testing
	User      string `json:"user"`
	AppName   string `json:"appName"`
	serviceID string `json:"serviceID"` //needed for testing
	LoginTime int64  `json:"loginTime"`
	Minutes   int    `json:"minutes"`
	Hour      int    `json:"hour"`
	Status    bool   `json:"status"`
}

type totalEventsAuthEvents struct {
	TotalLogins      int64 `json:"totalLogins"`
	SuccessfulLogins int64 `json:"successfulLogins"`
	FailedLogins     int64 `json:"failedLogins"`
}

type totalEventsByDate struct {
	Date             string `json:"date"`
	TotalLogins      int64  `json:"totalLogins"`
	SuccessfulLogins int64  `json:"successfulLogins"`
	FailedLogins     int64  `json:"failedLogins"`
}

type AggIps struct {
	Key      string       `json:"-"`
	Name     string       `json:"name"`
	Value    int          `json:"value"`
	Children []firstOctet `json:"children"`
}

type firstOctet struct {
	Key      string        `json:"-"`
	Name     string        `json:"name"`
	Value    int           `json:"value"`
	Children []secondOctet `json:"children"`
}

type secondOctet struct {
	Key      string       `json:"-"`
	Name     string       `json:"name"`
	Value    int          `json:"value"`
	Children []thirdOctet `json:"children"`
}

type thirdOctet struct {
	Key      string        `json:"-"`
	Name     string        `json:"name"`
	Value    int           `json:"value"`
	Children []fourthOctet `json:"children"`
}

type fourthOctet struct {
	Key   string `json:"-"`
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type ipAggr struct {
	IPAddr string `json:"name"`
	Count  int64  `json:"value"`
}
