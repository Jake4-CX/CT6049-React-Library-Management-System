-- Check and Create Sequences with Conditional Logic
DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'USERS_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE users_seq';
  END IF;
END;
/

DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'REFRESHTOKENS_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE refreshTokens_seq';
  END IF;
END;
/

DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'BOOKS_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE books_seq';
  END IF;
END;
/

DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'BOOKCATEGORIES_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE bookCategories_seq';
  END IF;
END;
/

DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'BOOKAUTHORS_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE bookAuthors_seq';
  END IF;
END;
/

DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'LOANEDBOOKS_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE loanedBooks_seq';
  END IF;
END;
/

DECLARE
  V_COUNT NUMBER;
BEGIN
  SELECT
    COUNT(*) INTO V_COUNT
  FROM
    USER_SEQUENCES
  WHERE
    SEQUENCE_NAME = 'LOANFINES_SEQ';
  IF V_COUNT = 0 THEN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE loanFines_seq';
  END IF;
END;
/

-- Create Tables with Primary Keys
CREATE TABLE USERS (
  ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  USEREMAIL VARCHAR2(32),
  USERPASSWORD VARCHAR2(256),
  USERCREATEDDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  USERUPDATEDDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  USERROLE VARCHAR2(5) DEFAULT 'USER' CHECK (USERROLE IN ('ADMIN', 'USER'))
);

CREATE TABLE BOOKAUTHORS (
  ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  AUTHORFIRSTNAME VARCHAR2(32),
  AUTHORLASTNAME VARCHAR2(32)
);

CREATE TABLE BOOKCATEGORIES (
  ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  CATEGORYNAME VARCHAR2(32),
  CATEGORYDESCRIPTION CLOB
);

CREATE TABLE BOOKS (
  ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  BOOKNAME VARCHAR2(128),
  BOOKISBN VARCHAR2(32),
  BOOKDESCRIPTION CLOB,
  BOOKQUANTITY NUMBER(11),
  BOOKTHUMBNAILURL VARCHAR2(512),
  BOOKPUBLISHEDDATE TIMESTAMP,
  BOOKAUTHORID NUMBER(11),
  BOOKCATEGORYID NUMBER(11),
  CONSTRAINT FK_BOOKAUTHORS FOREIGN KEY (BOOKAUTHORID) REFERENCES BOOKAUTHORS(ID),
  CONSTRAINT FK_BOOKCATEGORIES FOREIGN KEY (BOOKCATEGORYID) REFERENCES BOOKCATEGORIES(ID)
);

CREATE TABLE LOANEDBOOKS (
  ID NUMBER(11) DEFAULT LOANEDBOOKS_SEQ.NEXTVAL PRIMARY KEY,
  BOOKID NUMBER(11),
  USERID NUMBER(11),
  LOANEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  RETURNEDAT TIMESTAMP,
  CONSTRAINT FK_BOOKS FOREIGN KEY (BOOKID) REFERENCES BOOKS(ID),
  CONSTRAINT FK_USERS FOREIGN KEY (USERID) REFERENCES USERS(ID)
);


CREATE TABLE REFRESHTOKENS (
  ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  USERID NUMBER(11),
  REFRESHTOKEN VARCHAR2(512),
  EXPIRATIONDATE TIMESTAMP,
  CONSTRAINT FK_REFRESHTOKENS_USERS FOREIGN KEY (USERID) REFERENCES USERS(ID)
);

CREATE TABLE LOANFINES (
  ID NUMBER(11) DEFAULT LOANFINES_SEQ.NEXTVAL PRIMARY KEY,
  LOANID NUMBER(11),
  AMOUNTPAID NUMBER(11),
  PAIDAT TIMESTAMP,
  CONSTRAINT FK_LOANEDBOOKS FOREIGN KEY (LOANID) REFERENCES LOANEDBOOKS(ID)
);