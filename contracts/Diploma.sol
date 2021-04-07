// SPDX-License-Identifier: MIT
pragma solidity >0.5.0;

contract Diploma {

    struct MyDiplomaEntry {
        string ipfsHash;
        string fileName;
        uint timestamp;
        bytes32 checkSum;
        uint grade;
        bool isSet;
        address setBy;
    }

    mapping (bytes32 => MyDiplomaEntry) public myMapping;
    
    event NewEntry(bytes32 _checksum, string _ipfsHash, string _filename, address indexed _setBy);

    /*
    * 0x9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08, "test", 9
    */

    function createDiploma(bytes32 _checksum, string memory _ipfsHash, string memory _fileName, uint _grade) public {
        require(!myMapping[_checksum].isSet);

        myMapping[_checksum].isSet = true;
        myMapping[_checksum].ipfsHash = _ipfsHash;
        myMapping[_checksum].fileName = _fileName;
        myMapping[_checksum].timestamp = block.timestamp;
        myMapping[_checksum].grade = _grade;
        myMapping[_checksum].setBy = msg.sender;

        emit NewEntry(_checksum, _ipfsHash, _fileName, msg.sender);
    }

    function getDiploma(bytes32 _checksum) public view returns(string memory, string memory, uint, uint, address) {
        // require(myMapping[_checksum].isSet);
        return (myMapping[_checksum].fileName, myMapping[_checksum].ipfsHash, myMapping[_checksum].timestamp, myMapping[_checksum].grade, myMapping[_checksum].setBy);
    }

}
