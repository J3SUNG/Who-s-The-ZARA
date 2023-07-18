package com.ssafy.mafia.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PasswordResetDto {
    private String email;
    private String password;
    private String emailVerificationCode;
}
