/* Creating tables */

CREATE TABLE Users (
    userId VARCHAR(255),
    username VARCHAR(150) NOT NULL,
    userPhoto BYTEA,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    modifiedAt TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT PK_USERS PRIMARY KEY (userId),
    CONSTRAINT UQ_USERS UNIQUE (email)
);

CREATE TABLE Organizations (
    orgId VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    contactNo INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    photo BYTEA NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    modifiedAt TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT PK_ORGANIZATIONS PRIMARY KEY (orgId)
);

CREATE TABLE Events (
    eventId VARCHAR(255),
    orgId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    city VARCHAR(200) NOT NULL,
    state VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    geoLatLng POINT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    modifiedAt TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT PK_EVENTS PRIMARY KEY (eventId)
);

CREATE TABLE EventPhotos (
    photoId VARCHAR(255),
    photo BYTEA NOT NULL,
    eventId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    modifiedAt TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT PK_EVENTPHOTOS PRIMARY KEY (photoId)
);

CREATE TABLE EventTimings (
    timingId VARCHAR(255),
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    eventId VARCHAR(255) NOT NULL,
    CONSTRAINT PK_EVENTTIMINGS PRIMARY KEY (timingId)
);

CREATE TABLE Reviews (
    reviewId VARCHAR(255),
    description TEXT NOT NULL,
    star INT NOT NULL,
    eventId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    modifiedAt TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT PK_REVIEWS PRIMARY KEY (reviewId)
);

CREATE TABLE Bookings (
    bookingId VARCHAR(255),
    eventId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    modifiedAt TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT PK_BOOKINGS PRIMARY KEY (bookingId)
);

CREATE TABLE BookingItems (
    itemId VARCHAR(255),
    bookingId VARCHAR(255) NOT NULL,
    priceId VARCHAR(255) NOT NULL,
    orgId VARCHAR(255) NOT NULL,
    timingId VARCHAR(255) NOT NULL,
    qty INT NOT NULL,
    status VARCHAR(255) DEFAULT 'active' NOT NULL,
    CONSTRAINT PK_BOOKINGITEMS PRIMARY KEY (itemId),
    CONSTRAINT UQ_BOOKINGITEMS UNIQUE (bookingId)
);

CREATE TABLE EventPrices (
    priceId VARCHAR(255),
    eventId VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    currency VARCHAR(100) NOT NULL,
    maxLimit INT DEFAULT 0,
    sold INT DEFAULT 0,
    CONSTRAINT PK_EVENTPRICES PRIMARY KEY (priceId)
);

CREATE TABLE OrganizationTeamMembers (
    orgId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    CONSTRAINT UQ_ORGANINZATIONTEAMMEMBERS UNIQUE (userId)
);

/* Adding foreign key constraint to the table */

ALTER TABLE Events
ADD CONSTRAINT FK_EVENTS_ORGANIZATIONS FOREIGN KEY (orgId) REFERENCES Organizations(orgId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE EventPhotos
ADD CONSTRAINT FK_EVENTPHOTOS_EVENTS FOREIGN KEY (eventId) REFERENCES Events(eventId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE EventTimings
ADD CONSTRAINT FK_EVENTTIMINGS_EVENTS FOREIGN KEY (eventId) REFERENCES Events(eventId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Reviews
ADD CONSTRAINT FK_REVIEWS_EVENTS FOREIGN KEY (eventId) REFERENCES Events(eventId) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT FK_REVIEWS_USERS FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Bookings
ADD CONSTRAINT FK_BOOKINGS_USERS FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT FK_BOOKINGS_EVENTS FOREIGN KEY (eventId) REFERENCES Events(eventId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE BookingItems
ADD CONSTRAINT FK_BOOKINGITEMS_BOOKINGS FOREIGN KEY (bookingId) REFERENCES Bookings(bookingId) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT FK_BOOKINGITEMS_ORGANIZATIONS FOREIGN KEY (orgId) REFERENCES Organizations(orgId) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT FK_BOOKINGITEMS_EVENTPRICES FOREIGN KEY (priceId) REFERENCES EventPrices(priceId) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT FK_BOOKINGITEMS_EVENTTIMINGS FOREIGN KEY (timingId) REFERENCES EventTimings(timingId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE EventPrices
ADD CONSTRAINT FK_EVENTPRICES_EVENTS FOREIGN KEY (eventId) REFERENCES Events(eventId) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE OrganizationTeamMembers
ADD CONSTRAINT FK_ORGANINZATIONTEAMMEMBERS_USERS FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT FK_ORGANINZATIONTEAMMEMBERS_ORGANIZATIONS FOREIGN KEY (orgId) REFERENCES Organizations(orgId) ON DELETE CASCADE ON UPDATE CASCADE;


/* Trigger for adding sold ticket in event prices table */

CREATE OR REPLACE FUNCTION add_sold_ticket()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
    soldTicket INTEGER;
    totalSold INTEGER;
BEGIN
    SELECT EventPrices.sold INTO soldTicket 
    FROM EventPrices 
    WHERE EventPrices.priceId = NEW.priceId;

    totalSold = soldTicket + NEW.qty;

    UPDATE EventPrices SET sold = totalSold WHERE priceId = NEW.priceId;

    RETURN NEW;

END;
$$;

CREATE TRIGGER ADDSOLDTICKET
AFTER INSERT
ON BOOKINGITEMS
FOR EACH ROW
EXECUTE FUNCTION add_sold_ticket();

/* Trigger for updating sold tickets when user cancel's their booked events */

CREATE OR REPLACE FUNCTION cancel_sold_ticket()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
    soldTicket INTEGER;
    totalSold INTEGER;
BEGIN
    SELECT EventPrices.sold INTO soldTicket 
    FROM EventPrices 
    WHERE EventPrices.priceId = OLD.priceId;


    totalSold = soldTicket - OLD.qty;

    UPDATE EventPrices SET sold = totalSold WHERE priceId = OLD.priceId;

    RETURN OLD;

END;
$$;

CREATE TRIGGER CANCELSOLDTICKET
BEFORE DELETE
ON BOOKINGITEMS
FOR EACH ROW
EXECUTE FUNCTION cancel_sold_ticket();

/* Creating indexes */

CREATE INDEX Users_Idx
ON Users ("createdAt" DESC);

CREATE INDEX Events_Idx 
ON Events ("category", "createdAt" DESC);

CREATE INDEX Events_GeoLocation_Idx
ON Events USING GiST("geoLatLng");

CREATE INDEX EventPrices_Idx
ON EventPrices ("sold" DESC);

CREATE INDEX Bookings_Idx
ON Bookings ("createdAt" DESC);