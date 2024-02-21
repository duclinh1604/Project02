package fa.appcode.web.service.impl;

import fa.appcode.web.commons.utility.CONSTANT;
import fa.appcode.web.converter.CinemaRoomConverter;
import fa.appcode.web.dto.CinemaRoomDTO;
import fa.appcode.web.dto.MovieDTO;
import fa.appcode.web.entities.CinemaRoom;
import fa.appcode.web.entities.Seat;
import fa.appcode.web.repository.CinemaRoomRepository;
import fa.appcode.web.repository.SeatRepository;
import fa.appcode.web.service.CinemaRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CinemaRoomServiceImpl implements CinemaRoomService {
    @Autowired
    private CinemaRoomRepository cinemaRoomRepository;
    @Autowired
    private CinemaRoomConverter cinemaRoomConverter;
    @Autowired
    private  SeatRepository seatRepository;
    @Override
    public Map<String, Object> paging(int page, int size, String search, String field, String order) {
        return null;
    }

    @Override
    public CinemaRoomDTO save(CinemaRoomDTO cinemaRoomDTO) {
        CinemaRoom cinemaRoom = cinemaRoomConverter.convertToEntity(cinemaRoomDTO);
        List<Seat> seats = renderSeats(cinemaRoomDTO,cinemaRoom);
        cinemaRoom.setSeats(seats);
        CinemaRoom cinemaRoomSave = cinemaRoomRepository.save(cinemaRoom);
        return cinemaRoomConverter.convertToAllDependencies(cinemaRoomSave);
    }

    @Override
    public CinemaRoomDTO update(CinemaRoomDTO cinemaRoomDTO, Integer id) {
        Optional<CinemaRoom> cinemaRoom = cinemaRoomRepository.findById(id);
        if(cinemaRoom.isPresent()){
            CinemaRoom cinemaRoomUpdate = cinemaRoom.get();
            if(cinemaRoomDTO.getSeatQuantity() != cinemaRoomUpdate.getSeatQuantity()){
                deleteSeatsByCinemaRoomId(cinemaRoomDTO.getId());
                List<Seat> seats = renderSeats(cinemaRoomDTO,cinemaRoomUpdate);
                cinemaRoomUpdate.setSeats(seats);
            }
            cinemaRoomUpdate.setSeatQuantity(cinemaRoomDTO.getSeatQuantity());
            cinemaRoomUpdate.setRoomName(cinemaRoomDTO.getRoomName());
            CinemaRoom cinemaRoomSave = cinemaRoomRepository.save(cinemaRoomUpdate);
            return cinemaRoomConverter.convertToAllDependencies(cinemaRoomSave);
        }
        return  null;
    }


    @Override
    public boolean delete(Integer id) {
        cinemaRoomRepository.deleteById(id);
        return true;
    }

    @Override
    public CinemaRoomDTO findById(Integer id) {
        Optional<CinemaRoom> cinemaRoom = cinemaRoomRepository.findById(id);
        if(cinemaRoom.isPresent()){
            return cinemaRoomConverter.convertToAllDependencies(cinemaRoom.get());
        }
        return null;
    }

    @Override
    public Page<CinemaRoom> findAllByNameContaining(Integer size, Integer page, String searchNameRoom) {
        if (page == null) page = CONSTANT.PAGE_DEFAULT;
        if (size == null) size = CONSTANT.SIZE_DEFAULT;
        Pageable pageable = PageRequest.of(page, size);
        if (searchNameRoom == null) searchNameRoom = "";
        return cinemaRoomRepository.findByRoomNameLike(searchNameRoom, pageable);
    }


    @Override
    public List<CinemaRoomDTO> findAll() {
        List<CinemaRoom> cinemaRooms = cinemaRoomRepository.findAll();
        List<CinemaRoomDTO> cinemaRoomDTOS = cinemaRooms.stream().map(cinemaRoom -> cinemaRoomConverter.convertToDTO(cinemaRoom)).collect(Collectors.toList());
        return cinemaRoomDTOS;
    }

    @Override
    public void deleteSeatsByCinemaRoomId(Integer id) {
        seatRepository.deleteAllByCinemaRoomId(id);
    }

    List<Seat> renderSeats(CinemaRoomDTO cinemaRoomDTO, CinemaRoom cinemaRoom){
        char[] columnSeat = CONSTANT.COLUMN_SEAT;
        int row = cinemaRoomDTO.getSeatQuantity() / CONSTANT.COLUMN;
        char column = columnSeat[CONSTANT.COLUMN - 1];
        List<Seat> seats = new ArrayList<>();
        char character;
        for (int i = 1; i <= row; i++) {
            for (character = 'A'; character <= column; ++character) {
                Seat seat = new Seat();
                seat.setCinemaRoom(cinemaRoom);
                seat.setSeatColumn(character+"");
                seat.setSeatRow(i);
                seat.setSeatId(i);
                if(i == row){
                    seat.setSeatType(CONSTANT.SEAT_VIP);
                    seat.setSeatPrice(cinemaRoomDTO.getVipPrice());
                }else{
                    seat.setSeatPrice(cinemaRoomDTO.getNormalPrice());
                    seat.setSeatType(CONSTANT.SEAT_NORMAL);
                }
                seat.setStatus(CONSTANT.SEAT_CAN_CHOOSE);
                seats.add(seat);
            }

        }
        return seats;
    }
}